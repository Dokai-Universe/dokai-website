import * as Styles from "./style.css";
import SearchSVG from "@assets/icons/search.svg";
import { useState } from "react";
import { useRouter } from "nextjs-toploader/app";

const NewsPageSearchBar = ({
  inDetail,
  disabled = false,
}: {
  inDetail?: boolean;
  disabled?: boolean;
}) => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (value.trim()) params.set("query", value.trim());

    if (inDetail) {
      router.push(`/news?${params.toString()}`);
    } else {
      router.replace(`/news?${params.toString()}`);
    }
  };

  return (
    <div className={Styles.SearchBarContainer} data-disabled={disabled}>
      <label className={Styles.SearchBarLabel}>
        <input
          type="text"
          placeholder="Search for..."
          className={Styles.SearchBarInput}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <SearchSVG className={Styles.SearchBarIcon} onClick={handleSearch} />
      </label>
    </div>
  );
};

export default NewsPageSearchBar;
