"use client";

import { ReactNode, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation"; // Use 'next/navigation' instead
import { useMainContext } from "@/context/main";

interface GridLayoutProps {
	children: ReactNode;
}

// Define the shape of a category based on the API response
interface Category {
	_id: string;
	name: string;
}

const SidebarLinks: React.FC<{ categories: Array<Category> }> = ({
	categories,
}) => {
	const router = useRouter();
	const handleCategoryClick = (categoryId: string) => {
		router.push(`/?category=${categoryId}`);
	};

	return (
		<ul>
			{categories.map((category) => (
				<li key={category._id} className="mb-2">
					<button
						onClick={() => handleCategoryClick(category._id)}
						className="text-blue-500 hover:underline"
					>
						{category.name}
					</button>
				</li>
			))}
		</ul>
	);
};

const GridLayout: React.FC<GridLayoutProps> = ({ children }) => {
	const [isLinksOpen, setIsLinksOpen] = useState(false);
	const [mounted, setMounted] = useState(false);
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const context = useMainContext();
	const fetchCategories = async () => {
		try {
			const res = await fetch("/api/categories");
			const data = await res.json();
			context?.addCategoryList(data);
			setLoading(false);
		} catch (error) {
			setCategories([]);
			setLoading(false);
		}
	};

	useEffect(() => {
		setMounted(true);
		fetchCategories();
	}, []);

	// Define breakpoints
	const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

	if (mounted)
		return (
			<div className="min-h-screen bg-gray-100 w-full">
				<div className="container mx-auto p-4">
					<div
						className={`flex flex-col ${isMobile ? "gap-4" : "md:flex-row"}`}
					>
						{/* <aside className={`w-full ${!isMobile ? "md:w-64" : ""}`}>
							<div className="bg-white rounded-lg shadow-lg p-4">
								<div className="flex items-center justify-between">
									<h2 className="text-lg font-bold">Categories</h2>
									{isMobile && (
										<Collapsible
											open={isLinksOpen}
											onOpenChange={setIsLinksOpen}
										>
											<CollapsibleTrigger asChild>
												<Button
													onClick={() => setIsLinksOpen(!isLinksOpen)}
													className="p-2"
													variant="ghost"
												>
													<FontAwesomeIcon
														icon={isLinksOpen ? faTimes : faBars}
														className="text-xl"
													/>
												</Button>
											</CollapsibleTrigger>
										</Collapsible>
									)}
								</div>

								{isMobile ? (
									<Collapsible open={isLinksOpen} onOpenChange={setIsLinksOpen}>
										<CollapsibleContent>
											<SidebarLinks
												categories={context?.state.categories || []}
											/>
										</CollapsibleContent>
									</Collapsible>
								) : (
									<SidebarLinks categories={context?.state.categories || []} />
								)}
							</div>
						</aside> */}

						{/* Main Content */}
						<main className={`flex-1 ${isMobile ? "mt-4" : "md:ml-4"}`}>
							{children}
						</main>
					</div>
				</div>
			</div>
		);

	return null; // Return null if not mounted
};

export default GridLayout;
