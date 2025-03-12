import Form from "next/form";
import Link from "next/link";
import { Search } from "lucide-react";
import SearchFormReset from "./SearchFormReset";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        name="query"
        className="search-input"
        defaultValue={query}
        placeholder="Search Startups"
      />

      <div className="flex gap-2">
        {query && <SearchFormReset />}
        <button type="submit">
          <Link href="/" className="search-btn text-white">
            <Search />
          </Link>
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
