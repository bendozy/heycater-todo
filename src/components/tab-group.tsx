'use client';

import { SearchData } from "@/types/todo";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface TabGroupProps {
  searchData: SearchData;
}

const tabs: string[] = ['all', 'active', 'completed'];

const TabGroup: React.FC<TabGroupProps> = ({ searchData }) => {
  const router = useRouter();

  const handleTabChange = (tab: number) => {
    switch (tab) {
      case 1:
        router.push(`/?status=active`);
        break;
      case 2:
        router.push(`/?status=completed`);
        break;
      default:
        router.push('/');
        break;
    }
  };

  const getSelectedIndex = useMemo(() => {
    const { status } = searchData;
    if (status === 'active') return 1;
    if (status === 'completed') return 2;
    return 0;
  }, [searchData]);

  return (
    <Tab.Group manual onChange={handleTabChange} selectedIndex={getSelectedIndex}>
      <Tab.List className="flex space-x-1 rounded-xl bg-gray-900 p-1 mb-4">
        {tabs.map((tab: string) => (
          <Tab
            key={tab}
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white/60 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white text-black shadow'
                  : 'text-white hover:bg-white/[0.12] hover:text-white'
              )
            }
          >
            {tab?.toUpperCase()}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  );
};

export default TabGroup;
