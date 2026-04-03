import * as Styles from "./style.css";
import SearchSVG from "@assets/icons/search.svg";
import { useState } from "react";
import { useRouter } from "nextjs-toploader/app";

const NewsPageSearchBar = ({ inDetail }: { inDetail?: boolean }) => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("query", value);

    if (inDetail) {
      router.push(`/news?${params.toString()}`);
    } else {
      router.replace(`/news?${params.toString()}`);
    }
  };

  return (
    <label className={Styles.SearchBar}>
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
  );
};

export default NewsPageSearchBar;
