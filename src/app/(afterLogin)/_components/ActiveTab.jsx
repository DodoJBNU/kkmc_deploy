"use client";

import { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import Swiper from "swiper";
import { useShallow } from "zustand/react/shallow";
import { useWorkGroup } from "@/store/WorkGroup";
import { useTableData } from "@/store/TableData";

export default function ActiveTab() {
  const { workGroup, setWorkGroup, groups } = useWorkGroup(
    useShallow(state => ({
      workGroup : state.workGroup,
      setWorkGroup: state.setWorkGroup,
      groups: state.groups,
    })),
  );
  const { setCheckedRows } = useTableData(
    useShallow(state => ({
      setCheckedRows: state.setCheckedRows,
    }))
  )
  const handleTabClick = tabWorkGroup => () => {
    setWorkGroup(tabWorkGroup);
    if(tabWorkGroup !== workGroup){
      setCheckedRows([]);
    }
  }

  useEffect(() => {
    const swiper = new Swiper(".swiper", {
      direction: "horizontal",
      loop: false,
      centeredSlides: false,
      touchRatio: 1,
      freeMode: true,
      grabCursor: true,
      slidesPerView: "auto",
      spaceBetween: 0,
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
    });
    window.addEventListener('load', swiper);
    window.addEventListener('resize', swiper);
    return () => {
      window.removeEventListener('load', swiper);
      window.removeEventListener('resize', swiper);
    }
  }, []);

  useEffect(()=>{
    // 기본 activeTab 설정
    if(workGroup === ""){
      setWorkGroup(groups[0]);
    }
    console.log('workGroup은', workGroup);
  }, [groups, workGroup])
  return (
    <div className="flex p-2 swiper overflow-hidden tablet:min-w-120 flex-1">
      <div className="swiper-wrapper zero-to-tablet:text-xs">
        {Object.keys(groups).map(key => (
          <button
            key={key}
            className={`swiper-slide text-center py-2 px-4 border border-gray-300 whitespace-nowrap ${workGroup === groups[key] ? "bg-blue-500 text-white" : "bg-white"}`}
            onClick={handleTabClick(groups[key])}
          >
            {groups[key]}
          </button>
        ))}
      </div>
    </div>
  );
}
