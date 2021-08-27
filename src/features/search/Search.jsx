import { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NewPostModal } from "../posts/NewPostModal/NewPostModal";
import { setActiveNavTab } from "../navbar/navSlice";
import { RiQuillPenFill } from "react-icons/ri";
import { Button } from "shoto-ui";
import { debounce } from "../../helper";
import { searchUser } from "./searchSlice";
import { UserCard } from "./UserCard/UserCard";
import "./search.css";
import { Link } from "react-router-dom";

export const Search = () => {
  const dispatch = useDispatch();
  const [isNewPostModalVisible, setNewPostModalVisibility] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { searchResults, status } = useSelector((state) => state.search);

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
      <div className="container-search-input">
        <input
          type="text"
          onChange={handleChange}
          value={searchText}
          placeholder="Search gg"
        />
      </div>
      {searchResults && searchResults.length > 0 && (
        <div className="user-list">
          {searchResults.map((item) => (
            <Link to={`/${item.username}`} key={item._id}>
              <UserCard user={item} />
            </Link>
          ))}
        </div>
      )}
      {searchText === "" && searchResults.length === 0 ? (
        <div className="placeholder-text">
          You can find people here
          <br />
          <span className="text-grey">Try search query {`"user"`}</span>
        </div>
      ) : (
        searchResults.length === 0 &&
        status !== "loading" && (
          <div className="placeholder-text">
            No users found for {`"${searchText}"`}
          </div>
        )
      )}
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
