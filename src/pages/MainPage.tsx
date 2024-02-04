import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import { Wiki } from "../context/WikiContext";
import PostCard from "../components/PostCard";
import Header from "../components/Header";

export default function MainPage() {
    const [storedWikiList, setStoredWikiList] = useState<Wiki[]>([]);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page");
    const offset = page ? (parseInt(page) - 1) * 5 : 0;
    const currentPageData = storedWikiList.slice(offset, offset + 5)

    useEffect(() => {
        const savedData = localStorage.getItem('wikiData');
        if (savedData) {
            setStoredWikiList(JSON.parse(savedData));
        }
    }, []);

    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${today.getFullYear()}-${month}-${day}`;

    return (
        <div className="flex flex-col items-center h-full">
            <Header />
            <div className="w-full h-4/5 flex flex-col justify-center items-center max-w-screen-xl p-8">
                <form className="w-full bg-mainColor h-24 rounded-lg flex justify-center items-center pt-70">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-7/12 p-2 rounded-md text-xl outline-none mr-4"
                    />
                    <button className="bg-white py-2 px-4 rounded-md text-mainColor font-semibold">확인</button>
                </form>
                <ul className="w-full h-full mt-7">
                    {currentPageData.map((wiki, index) => (
                        <PostCard key={index} wiki={wiki} formattedDate={formattedDate} />
                    ))}
                </ul>
            </div>
            <div className="flex">
                <Pagination
                    totalPost={storedWikiList.length}
                    currentPage={page && parseInt(page) > 0 ? parseInt(page) : 1}
                    pageCount={5}
                    postCount={5}
                />
                <button className="w-16 h-10 rounded-md bg-mainColor items-center text-xs font-medium text-white" onClick={() => navigate('/upload')}>글쓰기</button>
            </div>
        </div>
    )
}
