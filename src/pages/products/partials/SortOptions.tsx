import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon, FilterIcon } from "@heroicons/react/solid"
import React, { Fragment } from "react"
import { sortOptions } from "../config"

interface SortOptionsProps {
  setMobileFiltersOpen: Function
  handleSort: Function
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const SortOptions = ({ setMobileFiltersOpen, handleSort }: SortOptionsProps) => {
  return (
    <div className="flex items-center">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="group inline-flex justify-center text-sm rounded-md bg-teal-500 hover:bg-teal-600 px-4 py-2  font-medium text-white ">
            Sort
            <ChevronDownIcon
              className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-white group-hover:text-gray-200"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {sortOptions.map((option) => (
                <Menu.Item key={option.name}>
                  {({ active }) => (
                    <button
                      onClick={() => handleSort(option.name)}
                      className={classNames(
                        option.current ? "font-medium text-gray-900" : "text-gray-500",
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm w-full text-left"
                      )}
                    >
                      {option.label}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      <button
        type="button"
        className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
        onClick={() => setMobileFiltersOpen(true)}
      >
        <span className="sr-only">Filters</span>
        <FilterIcon className="w-5 h-5" aria-hidden="true" />
      </button>
    </div>
  )
}

export default SortOptions
