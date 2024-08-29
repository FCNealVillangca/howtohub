"use client";
import React, { createContext, useState, ReactNode } from "react";

const mainContext = createContext<
	| {
			state: MainStateType;
			addPost: (post: PostType) => void;
			updatePost: (post: PostType) => void; // Added method
	  }
	| undefined
>(undefined);

type CategoryType = {
	_id: string;
	name: string;
};

type PostType = {
	_id: string;
	title: string; // Corrected from 'tittle' to 'title'
	content: string;
	categoryId: string;
};

type MainStateType = {
	categories: Array<CategoryType>;
	posts: Array<PostType>;
};

const MainContextProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [state, setState] = useState<MainStateType>({
		posts: [],
		categories: [],
	});

	const addPost = (post: PostType) => {
		setState((prevState) => ({
			...prevState,
			posts: [...prevState.posts, post],
		}));
	};

	const updatePost = (updatedPost: PostType) => {
		setState((prevState) => ({
			...prevState,
			posts: prevState.posts.map((post) =>
				post._id === updatedPost._id ? updatedPost : post
			),
		}));
	};

	return (
		<mainContext.Provider value={{ state, addPost, updatePost }}>
			{children}
		</mainContext.Provider>
	);
};

export default MainContextProvider;
export { mainContext };
