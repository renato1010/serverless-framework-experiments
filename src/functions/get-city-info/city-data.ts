export interface CityData {
  name: string;
  state: string;
  description: string;
  mayor: string;
  population: number;
  zipCodes?: string;
}

export const cityData: { [key: string]: CityData } = {
  newyork: {
    name: "New York",
    state: "New York",
    description:
      "New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that’s among the world’s major commercial, financial and cultural centers. Its iconic sites include skyscrapers such as the Empire State Building and sprawling Central Park. Broadway theater is staged in neon-lit Times Square.",
    mayor: "Bill de Blasio",
    population: 8399000,
    zipCodes: "100xx–104xx, 11004–05, 111xx–114xx, 116xx",
  },
  washington: {
    name: "Washington",
    state: "District of Columbia",
    description: `DescriptionWashington, DC, the U.S. capital, is a compact city on the Potomac River, bordering the states of Maryland and Virginia. It’s defined by imposing neoclassical monuments and buildings – including the iconic ones that house the federal government’s 3 branches: the Capitol, White House and Supreme Court. It's also home to iconic museums and performing-arts venues such as the Kennedy Center.`,
    mayor: "Muriel Bowser",
    population: 705549,
  },
  seattle: {
    name: "Seattle",
    state: "Washington",
    description: `DescriptionSeattle, a city on Puget Sound in the Pacific Northwest, is surrounded by water, mountains and evergreen forests, and contains thousands of acres of parkland. Washington State’s largest city, it’s home to a large tech industry, with Microsoft and Amazon headquartered in its metropolitan area. The futuristic Space Needle, a 1962 World’s Fair legacy, is its most iconic landmark.`,
    mayor: "Jenny Durkan",
    population: 744955,
  },
};
