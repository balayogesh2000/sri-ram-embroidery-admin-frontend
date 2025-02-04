"use client";

import EnquiriesOverview from "@/components/EnquiriesOverview";
import ProductsOverview from "@/components/ProductsOverview";
import withAuth from "@/hoc/withAuth";
import api from "@/lib/api";
import handleError from "@/utils/handleError";
import { useEffect, useState } from "react";

const Home = () => {
  const [overviewData, setOverviewData] = useState({
    totalProducts: 0,
    totalEnquiries: 0,
    latestProducts: [],
    latestEnquiries: [],
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
      <ProductsOverview
        totalProducts={overviewData.totalProducts}
        latestProducts={overviewData.latestProducts}
      />
      <EnquiriesOverview
        totalEnquiries={overviewData.totalEnquiries}
        latestEnquiries={overviewData.latestEnquiries}
      />
    </div>
  );
};

export default withAuth(Home);
