import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom";
import TextArea from "../components/TextArea";
import Header from "../components/Header";

export default function UploadPage() {
    const [wiki, setWiki] = useState({ title: '', content: '' });
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setWiki(prevWiki => ({
            ...prevWiki,
            [name]: value
        }));
    };

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setWiki({ title: '', content: '' });
        saveToLocalStorage();
        navigate('/')
    }

    const saveToLocalStorage = () => {
        const existingWikiData = JSON.parse(localStorage.getItem('wikiData') || '[]');
        const id = new Date().getTime();
        const newData = [...existingWikiData, { id, title: wiki.title, content: wiki.content }];
        localStorage.setItem('wikiData', JSON.stringify(newData));
    };
    return (
        <div className="flex flex-col items-center h-full">
            <Header />
            <form className="w-full h-full flex flex-col justify-center items-center max-w-screen-xl px-28" onSubmit={handleSubmit}>
                <input className="w-full p-5 rounded-lg border-2 border-zinc-300 outline-none text-2xl" name="title" type="text" placeholder="Text" onChange={handleChange} />
                <TextArea textAreacontent={wiki.content} onChange={handleChange} />
                <div className="flex">
                    <button className="w-28 mr-3 h-12 rounded-md bg-mainColor items-center text-md font-medium text-white" type="submit">등록하기</button>
                    <button className="w-28 h-12 rounded-md bg-subColor text-mainColor items-center text-md font-medium" onClick={() => navigate('/')}>등록취소</button>
                </div>

            </form>
        </div >
    )
}
