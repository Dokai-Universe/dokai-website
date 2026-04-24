import { useEffect, useState } from "react";

const useMount = () => {
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true));

  return mounted;
};

export default useMount;
