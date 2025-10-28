"use client";
import { useGenerationStore } from "@/stores";
import { Generation } from "@/types";
import { ClassName } from "@/types/styles";
import React, { useEffect, useRef } from "react";
import GenerationItem from "./components/GenerationItem";
import Loader from "../Loader";
import { useAuth } from "@/contexts";

interface GenerationsListProps {
  className?: ClassName;
}

const GenerationsList = ({ className }: GenerationsListProps) => {
  const { generations, isLoading, hasMore, fetchMoreGenerations } =
    useGenerationStore();
  const { isAuthenticated } = useAuth();
  const observerTarget = useRef<HTMLDivElement>(null);

  // Initial fetch
  useEffect(() => {
    if (isAuthenticated &&generations.length === 0) {
      fetchMoreGenerations();
    }
  }, []);

  // Setup intersection observer once
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading && isAuthenticated) {
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
      className={`bg-var-secondary rounded-xl shadow-lg  pr-1 py-5 flex flex-col ${className}`}
    >
      <div className="text-md font-normal  pl-6 mb-4">Generations</div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 pt-2  pl-6 pr-5 ">
        {!isLoading && !generations.length && (
          <div className="text-sm text-var-text-secondary text-center py-8">
            No data found.
          </div>
        )}
        <div className="space-y-4">
          {generations.map((generation: Generation) => (
            <GenerationItem key={generation.id} {...generation} />
          ))}
        </div>
        <div ref={observerTarget} className="h-4" />

        {false && <Loader parentClassName="flex justify-center" />}
      </div>
    </div>
  );
};

export default GenerationsList;
