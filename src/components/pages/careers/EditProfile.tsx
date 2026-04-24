import EditMediaSingle from "@components/ui/Edit/EditMediaSingle/EditMediaSingle";
import * as Styles from "./style.css";
import { useFormContext } from "react-hook-form";
import { ProfileFormInput } from "./career";
import { MediaSource } from "@domain/media.js";
import ErrorText from "@components/ui/Edit/ErrorText/ErrorText";
import ContactIcon from "./ContactIcon";
import Link from "next/link";
import EditButton from "@components/ui/Edit/EditButton/EditButton";
import AddButton from "@components/ui/Edit/AddButton/AddButton";
import { useModalStackStore } from "@stores/modalStackStore";
import TitleRichText from "@components/ui/Edit/TitleRichText/TitleRichText";

const CareerEditProfile = () => {
  const { push } = useModalStackStore();
  const form = useFormContext<ProfileFormInput>();
  const {
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = form;

  const avatar = watch("avatar") as MediaSource;
  const contacts = watch("contacts");

  const handleEditContact = (contactIdx: number) => {
    if (!contacts) return;
    push("EDIT_CONTACT", {
      initial: contacts[contactIdx],
      applyContact: (contact) => {
        setValue(
          "contacts",
          contacts.map((c, idx) => (idx === contactIdx ? contact : c)),
        );
      },
      deleteContact: () => {
        setValue(
          "contacts",
          contacts.filter((_, idx) => idx !== contactIdx),
        );
      },
    });
  };

  const handleAddContact = () => {
    if (!contacts) return;
    push("EDIT_CONTACT", {
      initial: {
        name: "Instagram",
        value: "",
        href: "",
      },
      applyContact: (contact) => {
        setValue("contacts", [...contacts, contact]);
      },
    });
  };

  return (
    <section className={Styles.ProfileContainer}>
      <div className={Styles.EditProfileMediaContainer}>
        <EditMediaSingle
          media={avatar}
          applyMedia={(media) => {
            setValue("avatar", media);
          }}
          blockedTypes={["VIDEO"]}
          onClick={() => {
            clearErrors("avatar");
          }}
          className={Styles.EditProfileMedia}
          cardClassName={Styles.EditProfileMedia}
        />
        <ErrorText message={errors.avatar?.message} />
      </div>
      <TitleRichText
        title="Bio"
        form={form}
        name="bio"
        className={Styles.EditProfileBioContainer}
        placeholder="Bio"
      />
      <div className={Styles.EditProfileContactContainer}>
        {contacts?.map((contact, idx) => (
          <div
            key={`CONTACT_${contact.name}`}
            className={Styles.ProfileContactItem}
          >
            <div className={Styles.ProfileContactLabelContainer}>
              <ContactIcon
                type={contact.name}
                className={Styles.ProfileContactLabelIcon}
              />
              <p className={Styles.ProfileContactLabel}>{contact.name}</p>
            </div>
            <div className={Styles.EditProfileContactValueContainer}>
              <Link href={contact.href} className={Styles.ProfileContactValue}>
                {contact.value}
              </Link>
              <EditButton onClick={() => handleEditContact(idx)} />
            </div>
          </div>
        ))}
        <AddButton onClick={handleAddContact} />
        <ErrorText message={errors.contacts?.message} />
      </div>
    </section>
  );
};

export default CareerEditProfile;
