import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useMemo, useCallback } from "react";
import { NewPostModal } from "../posts/NewPostModal/NewPostModal";
import { setActiveNavTab } from "../navbar/navSlice";
import { RiQuillPenFill } from "react-icons/ri";
import { Button } from "shoto-ui";
import { debounce } from "../../helper";
import { searchUser } from "./searchSlice";

export const Search = () => {
  const dispatch = useDispatch();
  const [isNewPostModalVisible, setNewPostModalVisibility] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { searchResults } = useSelector((state) => state.search);
  
  useEffect(() => {
    dispatch(setActiveNavTab({ activeTab: "search" }));
  });

  const search = useCallback(
    (searchQuery) => {
      if (searchQuery.length > 0) dispatch(searchUser(searchQuery));
    },
    [dispatch]
  );

  const debouncedSearch = useMemo(
    () =>
      debounce((searchQuery) => {
        search(searchQuery);
      }),
    [search]
  );

  const handleChange = (e) => {
    setSearchText(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <div className="container-main-content">
      Search here
      <input type="text" onChange={handleChange} value={searchText} />
      {searchResults && searchResults.length > 0 && <div>results</div>}
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
