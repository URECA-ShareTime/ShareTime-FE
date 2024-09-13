import { useState } from "react";
import LeftBarAccordion from "./LeftBarAccordion"
import { Accordion } from 'flowbite-react';

export default function LeftBar() {
    const [activeIdx, setActiveIdx] = useState(0);
  // 클릭한 아이템의 인덱스를 activeIdx에 저장
    const handleActiveIdx = (idx) => setActiveIdx(activeIdx === idx ? 0 : idx); 

    return (
        <div className="w-[150px] h-content overflow-y-scroll px-4 py-4 bg-primary-darkblue">
            {/* 전체, 클래스, 스터디 데이터 props로 넘겨주기 */}
            <LeftBarAccordion title="All" activeIdx={activeIdx} id={1} handleActiveIdx={handleActiveIdx}/>
            <LeftBarAccordion title="Front-End" activeIdx={activeIdx} id={2} handleActiveIdx={handleActiveIdx}/> 
            <LeftBarAccordion title="Back-End" activeIdx={activeIdx} id={3} handleActiveIdx={handleActiveIdx}/>
            {/* 스터디 배열의 개수만큼 map으로 만들기 */}
            <LeftBarAccordion title="Study1" activeIdx={activeIdx} id={4} handleActiveIdx={handleActiveIdx}/>
            <LeftBarAccordion title="Study2" activeIdx={activeIdx} id={5} handleActiveIdx={handleActiveIdx}/>
        </div>
    )
}