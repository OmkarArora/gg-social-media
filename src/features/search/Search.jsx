import { useDispatch } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import { NewPostModal } from "../posts/NewPostModal/NewPostModal";
import { setActiveNavTab } from "../navbar/navSlice";
import { RiQuillPenFill } from "react-icons/ri";
import { Button } from "shoto-ui";
import { debounce } from "../../helper";

export const Search = () => {
  const dispatch = useDispatch();
  const [isNewPostModalVisible, setNewPostModalVisibility] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(setActiveNavTab({ activeTab: "search" }));
  });

  const search = (searchQuery) => {
    if (searchQuery.length > 0) console.log(searchQuery);
  };

  const debouncedSearch = useMemo(
    () => debounce((searchQuery) => search(searchQuery)),
    []
  );

  const handleChange = (e) => {
    setSearchText(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <div className="container-main-content">
      Search here
      <input type="text" onChange={handleChange} value={searchText} />
      <div className="container-fab">
        <Button type="icon" onClick={() => setNewPostModalVisibility(true)}>
          <RiQuillPenFill />
        </Button>
      </div>
      {isNewPostModalVisible && (
        <NewPostModal onClose={() => setNewPostModalVisibility(false)} />
      )}
    </div>
  );
};
