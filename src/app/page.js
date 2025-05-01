"use client";

import EnquiriesOverview from "@/components/EnquiriesOverview";
import ProductsOverview from "@/components/ProductsOverview";
import CollectionsOverview from "@/components/CollectionsOverview";
import withAuth from "@/hoc/withAuth";
import api from "@/lib/api";
import handleError from "@/utils/handleError";
import { useEffect, useState } from "react";

const Home = () => {
  const [overviewData, setOverviewData] = useState({
    totalProducts: 0,
    totalEnquiries: 0,
    totalCollections: 0,
    latestProducts: [],
    latestEnquiries: [],
    latestCollections: [],
  });

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const { data } = await api.admin.getOverview();
        setOverviewData(data);
      } catch (error) {
        handleError(error);
      }
    };

    fetchOverviewData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <EnquiriesOverview
        totalEnquiries={overviewData.totalEnquiries}
        latestEnquiries={overviewData.latestEnquiries}
      />
      <CollectionsOverview
        totalCollections={overviewData.totalCollections}
        latestCollections={overviewData.latestCollections}
      />
      <ProductsOverview
        totalProducts={overviewData.totalProducts}
        latestProducts={overviewData.latestProducts}
      />
    </div>
  );
};

export default withAuth(Home);
