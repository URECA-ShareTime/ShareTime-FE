import { useState } from 'react';
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
  } from "@material-tailwind/react";
import testImg from '../../../assets/profileimage.png';
import LeftBarProfile from './LeftBarProfile';

const TEST_LIST = [
  { name: 'ongheong', profile: testImg, isFollow: true },
  { name: 'ongheong', profile: testImg, isFollow: false },
  { name: 'ongheong', profile: testImg, isFollow: true },
  { name: 'ongheong', profile: testImg, isFollow: false },
  { name: 'ongheong', profile: testImg, isFollow: true },
  { name: 'ongheong', profile: testImg, isFollow: false },
  { name: 'ongheong', profile: testImg, isFollow: true },
  { name: 'ongheong', profile: testImg, isFollow: false },
  { name: 'ongheong', profile: testImg, isFollow: true },
  { name: 'ongheong', profile: testImg, isFollow: false },
];

function AccordionIcon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      className={`${
        id === open ? 'rotate-180' : ''
      } h-5 w-5 transition-transform duration-300 ease-in-out`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export default function LeftBarAccordion({
  activeIdx,
  title,
  id,
  handleActiveIdx,
}) {
  return (
    <>
      <Accordion
        open={activeIdx === id}
        icon={<AccordionIcon id={id} open={activeIdx} />}
        className='w-[130px]'
      >
          <AccordionHeader onClick={() => handleActiveIdx(id)} className='text-base border-b-white text-white'>
            {title}
          </AccordionHeader>
          <AccordionBody className="max-h-[400px] overflow-y-scroll ">
            {TEST_LIST.map((item, idx, isFollow) => (
                <LeftBarProfile key={idx} item={item} isFollow={item.isFollow}/>
            ))}
          </AccordionBody>
      </Accordion>
    </>
  );
}
