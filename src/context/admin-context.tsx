"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { auth } from "@/functions/firebase";
import { useRouter } from "next/navigation";
import { getADocument } from "@/functions/get-a-document";
import { listenToSubCollection } from "@/functions/get-a-sub-collection";
import { getACollection } from "@/functions/get-a-collection";

interface AdminContextType {
  members: any[];
  advisoryMembers: any[];
  donations: any[];
  offers: any[];
}

const AuthContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [members, setMembers] = useState<any[]>([]);
  const [advisoryMembers, setAdvisoryMembers] = useState<any[]>([]);
  const [donations, setDonations] = useState<any[]>([]);
  const [offers, setOffers] = useState<any[]>([]);

  useEffect(() => {
    // const unsubscribeDonations = listenToSubCollection("users", user.uid, "donations", setDonations)
    // const unsubscribeOffers = listenToSubCollection("users", user.uid, "offers", setOffers)
    const unsubscribeMembers = getACollection("users", (datas) => {
      console.log("Raw users from Firestore:", datas);
      const filtered = datas.filter(
        (member) =>
          !member.role ||
          (typeof member.role === "string" &&
            member.role.toLowerCase() !== "admin")
      );
      console.log("Filtered members:", filtered);
      setMembers(filtered);
    });

    const unsubscribeAdvisoryBoard = getACollection(
      "advisory",
      setAdvisoryMembers
    );
    return () => {
      if (unsubscribeMembers) unsubscribeMembers();
      if (unsubscribeAdvisoryBoard) unsubscribeAdvisoryBoard();
      //   if (unsubscribeOffers) unsubscribeOffers()
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ members, advisoryMembers, donations, offers }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAdminContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
