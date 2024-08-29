"use client";
import {
	Collapsible,
	CollapsibleTrigger,
	CollapsibleContent,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ReactNode, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";

interface GridLayoutProps {
	children: ReactNode;
}

// Example categories with creative names and UUIDs
const categories = [
	{
		id: "6e8d8f60-8f51-4d60-a8db-c7c8fbd38e0b",
		name: "Mystical Realms",
		slug: "mystical-realms",
	},
	{
		id: "a2f5a9a1-3e78-4c75-8dce-8d40a5b028f9",
		name: "Galactic Explorations",
		slug: "galactic-explorations",
	},
	{
		id: "eae8ff8a-5571-4f5f-bc9d-11861c54d0b3",
		name: "Urban Legends & Lore",
		slug: "urban-legends-lore",
	},
	{
		id: "d4f3d2b5-b029-4c60-bb2d-3a3d9eb4b9b9",
		name: "Culinary Journeys",
		slug: "culinary-journeys",
	},
	{
		id: "fdac09da-df5b-4ea8-b2d2-026c97e22f8b",
		name: "Ancient Secrets",
		slug: "ancient-secrets",
	},
	{
		id: "8e5f6e7a-45e8-48d2-b9d3-5b75d1a7db23",
		name: "Enchanted Wilderness",
		slug: "enchanted-wilderness",
	},
	{
		id: "b4c3e94f-3baf-4a57-94e1-5b7a3d70f8d1",
		name: "Celestial Phenomena",
		slug: "celestial-phenomena",
	},
	{
		id: "fc04c5e7-6c37-42b7-b4d2-7b8a3f5cde82",
		name: "Historical Mysteries",
		slug: "historical-mysteries",
	},
	{
		id: "a743bd78-5a77-4bcb-8b44-4cbd7249e4e1",
		name: "Futuristic Innovations",
		slug: "futuristic-innovations",
	},
	{
		id: "d6e0b9b2-40d2-4a4f-9d62-5a19f5c4d40e",
		name: "Timeless Legends",
		slug: "timeless-legends",
	},
];

const SidebarLinks: React.FC = () => {
	return (
		<ul>
			{categories.map((category) => (
				<li key={category.id} className="mb-2">
					<a href={`/${category.slug}`} className="hover:underline">
						{category.name}
					</a>
				</li>
			))}
		</ul>
	);
};

const GridLayout: React.FC<GridLayoutProps> = ({ children }) => {
	const [isLinksOpen, setIsLinksOpen] = useState(false);
	const [mounted, setMounted] = useState(false);
	// const [categories, setCategories] = useState<
	// 	Array<{ [key: string]: string }>
	// >([]);

	const [loading, setLoading] = useState<boolean>(true);

	const fetchCategories = async () => {
		try {
			const res = await fetch("/api/posts");
			const posts = await res.json();

			return posts;
		} catch (error) {
			return [];
		}
	};

	useEffect(() => {
		setMounted(true);
		fetchCategories().then((categories) => {
			console.log(categories);
		});
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
						{/* Sidebar */}
						<aside className={`w-full ${!isMobile ? "md:w-64" : ""}`}>
							<div className="bg-white rounded-lg shadow-lg p-4">
								<div className="flex items-center justify-between">
									<h2 className="text-lg font-bold">Sidebar</h2>
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

								{/* Collapsible Links for Mobile */}
								{isMobile ? (
									<Collapsible open={isLinksOpen} onOpenChange={setIsLinksOpen}>
										<CollapsibleContent>
											<SidebarLinks />
										</CollapsibleContent>
									</Collapsible>
								) : (
									<SidebarLinks />
								)}
							</div>
						</aside>

						{/* Main Content */}
						<main className={`flex-1 ${isMobile ? "mt-4" : "md:ml-4"}`}>
							{children}
						</main>
					</div>
				</div>
			</div>
		);
};

export default GridLayout;
