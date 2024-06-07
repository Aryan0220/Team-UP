"use client";
import { EmptySearch } from "./empty-search";
import { EmptyFavourites } from "./empty-favourites";
import { EmptyBorads } from "./empty-boards";

interface BoardListProps {
    orgId: string,
    query: {
        search?: string;
        favourites?: string;
    }
}

export const BoardList = ({
    orgId,
    query,
}: BoardListProps) => {
    const data = [];
    if(!data.length && query.search){
        return (
            <EmptySearch />
        )
    }
    else if(!data.length && query.favourites){
        return (
            <EmptyFavourites />
        )
    }
    else if(!data.length){
        return(
            <EmptyBorads />
        )
    }
    return (
        <div>
            
        </div>
    )
}