import BrowseByGenre from "@/components/HomepageCompo/BrowseByGenre";
import FeatureCards from "@/components/HomepageCompo/FeatureCards";
import Hero from "@/components/HomepageCompo/Hero";
import LatestReleases from "@/components/HomepageCompo/LatestReleases";
import WritersGrid from "@/components/HomepageCompo/WritersGrid";


export default function Home() {
  return (
    <div className="">
        <Hero></Hero>
        <FeatureCards></FeatureCards>
        <LatestReleases></LatestReleases>
        <WritersGrid></WritersGrid>
        <BrowseByGenre></BrowseByGenre>
    </div>
  );
}
