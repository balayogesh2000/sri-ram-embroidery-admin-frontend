"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useParams } from "next/navigation";
import handleError from "@/utils/handleError";
import EnquiryDetails from "@/components/EnquiryDetails";

const Enquiry = () => {
  const { enquiryId } = useParams();
  const [enquiry, setEnquiry] = useState(null);

  useEffect(() => {
    const fetchEnquiry = async () => {
      try {
        const {
          data: { enquiry },
        } = await api.enquiries.getById(enquiryId);
        setEnquiry(enquiry);
      } catch (error) {
        handleError(error);
      }
    };

    fetchEnquiry();
  }, [enquiryId]);

  if (!enquiry) return null;
  return <EnquiryDetails enquiry={enquiry} />;
};

export default Enquiry;
