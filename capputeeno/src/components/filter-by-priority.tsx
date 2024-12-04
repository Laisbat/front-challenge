import { useFilter } from "@/hooks/useFilter";
import { PriorityTypes } from "@/types/priority-types";
import { useState } from "react";
import { styled } from "styled-components";
import { ArrowIcon } from "./icons/arrow-icon";

interface FilterByPriorityProps {}

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  button {
    border: none;
    background: transparent;
    cursor: pointer;
    font-family: inherit;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: var(--text-dark);
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      margin-left: 16px;
    }
  }
`;

const PriorityFilter = styled.ul`
  position: absolute;
  width: 250px;
  background: #ffffff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 12px 16px;
  list-style: none;
  top: 100%;
  li {
    color: var(--text-dark);
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    cursor: pointer;
  }
  li + li {
    margin-top: 4px;
  }
`;

const priorityOptions = Object.keys(PriorityTypes).filter((key) =>
  isNaN(Number(key))
);

export function FilterByPriority(props: FilterByPriorityProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { setPriority } = useFilter();
  const handleOpen = () => setIsOpen((prev) => !prev);
  const handleUpdatePriority = (value: PriorityTypes) => {
    setPriority(value);
    setIsOpen(false);
  };

  return (
    <FilterContainer>
      <button onClick={handleOpen}>
        Organizar por
        <ArrowIcon />
      </button>
      {isOpen && (
        <PriorityFilter>
          {priorityOptions.map((key) => (
            <li
              key={key}
              onClick={() =>
                handleUpdatePriority(
                  PriorityTypes[key as keyof typeof PriorityTypes]
                )
              }
            >
              {PriorityTypes[key as keyof typeof PriorityTypes]}
            </li>
          ))}
        </PriorityFilter>
      )}
    </FilterContainer>
  );
}
