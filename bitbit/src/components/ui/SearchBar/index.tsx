import { useState } from "react";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 实现搜索功能
    console.log("Search for:", searchText);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-4">
      <form className="container-main" onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="搜索活动、帖子、用户..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full px-5 py-3 border border-gray-200 rounded-full text-body text-text-primary placeholder:text-text-tertiary focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-colors duration-250"
        />
      </form>
    </div>
  );
};

export default SearchBar;
