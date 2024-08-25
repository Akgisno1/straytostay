"use client";
import React from "react";
import { useMediaQuery } from "react-responsive";

const FilterComponent = ({ filter, setFilter, filters }) => {
  const isMobileOrTablet = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      {isMobileOrTablet ? (
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded border border-gray-300 p-2"
        >
          {filters.map((f) => (
            <option key={f} value={f}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </option>
          ))}
        </select>
      ) : (
        filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded p-2 ${filter === f ? "bg-green-500 text-primary" : "bg-primary-foreground text-primary"} transition`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))
      )}
    </div>
  );
};

export default FilterComponent;
