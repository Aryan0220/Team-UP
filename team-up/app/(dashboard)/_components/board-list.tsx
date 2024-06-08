"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { EmptySearch } from "./empty-search";
import { EmptyFavourites } from "./empty-favourites";
import { EmptyBorads } from "./empty-boards";
import { BoardCard } from "./board-card";
import { NewBoardButton } from "./new-board-button";

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
    const data = useQuery(api.boards.get, {orgId});
    if(data === undefined){
        return (
            <div>
            <h2 className="text-3xl">
                {query.favourites ? "Favourite Boards" : "Team Borads"}
            </h2>
                <div className="grid grid-col-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:gird-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                <NewBoardButton orgId={orgId} disabled />
                <BoardCard.Skelton />
            </div>
            </div>
        )
    }

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
            <h2 className="text-3xl">
                {query.favourites ? "Favourite Boards" : "Team Borads"}
            </h2>
                <div className="grid grid-col-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:gird-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                    <NewBoardButton 
                    orgId={orgId}
                    />
                    {data?.map((board) => (
                        <BoardCard
                            key={board._id}
                            id={board._id}
                            title={board.title}
                            imageUrl={board.imageUrl}
                            authorId={board.authorId}
                            authorName={board.authorName}
                            createdAt={board._creationTime}
                            orgId={board.orgId}
                            isFavourite={false}
                        />
                    ))}  
                </div>
        </div>
    )
}