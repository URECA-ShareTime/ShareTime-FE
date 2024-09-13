import { useState } from 'react';
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
  } from "@material-tailwind/react";
import testImg from '../../../assets/profileimage.png';

const TEST_LIST = [
  { name: 'ongheong', profile: testImg },
  { name: 'ongheong', profile: testImg },
  { name: 'ongheong', profile: testImg },
  { name: 'ongheong', profile: testImg },
  { name: 'ongheong', profile: testImg },
  { name: 'ongheong', profile: testImg },
  { name: 'ongheong', profile: testImg },
  { name: 'ongheong', profile: testImg },
  { name: 'ongheong', profile: testImg },
  { name: 'ongheong', profile: testImg },
  { name: 'ongheong', profile: testImg },
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
      >
          <AccordionHeader onClick={() => handleActiveIdx(id)} className='text-base border-b-white'>
            {title}
          </AccordionHeader>
          <AccordionBody className="max-h-[400px] overflow-y-scroll ">
            {TEST_LIST.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3">
                <img
                  src={item.profile}
                  alt="profile"
                  className="w-8 h-8 rounded-full"
                />
                <span>{item.name}</span>
              </div>
            ))}
          </AccordionBody>
      </Accordion>
    </>
  );
}
