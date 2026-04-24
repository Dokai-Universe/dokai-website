import { AdminMemberDiffPayload, AdminMemberItem } from "./types";

export const createTempMemberId = () =>
  `member_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

export const normalizeMembers = (
  members: AdminMemberItem[],
): AdminMemberItem[] => {
  const fixedMembers = members
    .filter((member) => member.isFixed)
    .map((member, index) => ({
      ...member,
      email: member.email.trim().toLowerCase(),
      role: member.role ?? null,
      fixedOrder: index,
    }));

  const nonFixedMembers = members
    .filter((member) => !member.isFixed)
    .map((member) => ({
      ...member,
      email: member.email.trim().toLowerCase(),
      role: member.role ?? null,
      fixedOrder: null,
    }));

  return [...fixedMembers, ...nonFixedMembers];
};

const isSameMember = (a: AdminMemberItem, b: AdminMemberItem) => {
  return (
    a.email === b.email &&
    a.role === b.role &&
    a.isFixed === b.isFixed &&
    a.fixedOrder === b.fixedOrder
  );
};

export const diffMembers = (
  initial: AdminMemberItem[],
  current: AdminMemberItem[],
): AdminMemberDiffPayload => {
  const initialMap = new Map(
    initial.map((member) => [member.memberId, member]),
  );
  const currentMap = new Map(
    current.map((member) => [member.memberId, member]),
  );

  const created = current.filter((member) => !initialMap.has(member.memberId));

  const updated = current.filter((member) => {
    const prev = initialMap.get(member.memberId);
    if (!prev) return false;
    return !isSameMember(prev, member);
  });

  const deleted = initial.filter((member) => !currentMap.has(member.memberId));

  return {
    created,
    updated,
    deleted,
  };
};

export const reorderFixedMembers = (
  members: AdminMemberItem[],
  activeId: string,
  overId: string,
) => {
  const fixedMembers = members.filter((member) => member.isFixed);
  const nonFixedMembers = members.filter((member) => !member.isFixed);

  const oldIndex = fixedMembers.findIndex(
    (member) => member.memberId === activeId,
  );
  const newIndex = fixedMembers.findIndex(
    (member) => member.memberId === overId,
  );

  if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) {
    return normalizeMembers(members);
  }

  const nextFixed = [...fixedMembers];
  const [moved] = nextFixed.splice(oldIndex, 1);
  nextFixed.splice(newIndex, 0, moved);

  return normalizeMembers([...nextFixed, ...nonFixedMembers]);
};
