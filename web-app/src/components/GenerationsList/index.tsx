"use client";
import { useGenerationStore } from "@/stores";
import { Generation } from "@/types";
import { ClassName } from "@/types/styles";
import React, { useEffect, useRef } from "react";
import GenerationItem from "./components/GenerationItem";
import Loader from "../Loader";

interface GenerationsListProps {
  className?: ClassName;
}

const GenerationsList = ({ className }: GenerationsListProps) => {
  const { generations, isLoading, hasMore, fetchMoreGenerations } =
    useGenerationStore();

  const observerTarget = useRef<HTMLDivElement>(null);

  // Initial fetch
  useEffect(() => {
    if (generations.length === 0) {
      fetchMoreGenerations();
    }
  }, []);

  // Setup intersection observer once
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          fetchMoreGenerations();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    const target = observerTarget.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [hasMore, isLoading, fetchMoreGenerations]);

  return (
    <div
      className={`bg-var-secondary rounded-xl shadow-lg px-6 py-5 flex flex-col ${className}`}
    >
      <div className="text-md font-medium mb-4">Generations</div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden mr-5 min-h-0">
        {!isLoading && !generations.length && (
          <div className="text-sm text-var-text-secondary text-center py-8">
            No data found.
          </div>
        )}
        <div className="space-y-4 px-3">
          {generations.map((generation: Generation) => (
            <GenerationItem key={generation.id} {...generation} />
          ))}
        </div>

        {/* Sentinel element for infinite scroll */}
        <div ref={observerTarget} className="h-4" />

        {isLoading && <Loader parentClassName="flex justify-center my-4" />}
      </div>
    </div>
  );
};

export default GenerationsList;
