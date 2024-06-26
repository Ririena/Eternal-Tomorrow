import React, { useState, useEffect } from "react";
import { getLeaderboardData } from "../../libs/LeaderboardLibs";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Pagination,
} from "@nextui-org/react";
import { HiOutlineMail } from "react-icons/hi";
import RankLoader from "../../components/Loader/RankLoader";
const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showLoader, setShowLoader] = useState(true); // State to control the loader visibility

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getLeaderboardData();
        setLeaderboardData(data);

        // Simulate a 5-second delay before showing the content
        setTimeout(() => {
          setLoading(false);
          setShowLoader(false);
        }, 5000);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    }

    fetchData();
  }, []);

  // Sort leaderboard data by total_surat in descending order
  const sortedData = [...leaderboardData].sort(
    (a, b) => b.total_surat - a.total_surat
  );

  // Add rank to each user based on their position in sortedData
  const rankedData = sortedData.map((user, index) => ({
    ...user,
    rank: index + 1,
  }));

  // Calculate total pages
  const totalPages = Math.ceil(rankedData.length / itemsPerPage);

  // Determine number of pagination links to show
  const maxPaginationLinks = Math.ceil(totalPages / itemsPerPage);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rankedData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Define columns
  const columns = [
    { key: "rank", label: "Rank" },
    { key: "nama_user", label: "Nama User" },
    { key: "total_surat", label: "Total Surat" },
  ];

  return (
    <>
      {showLoader && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <RankLoader />
        </div>
      )}
      {!showLoader && (
        <div className=" flex flex-col items-center mt-24">
          <Table
            aria-label="Leaderboard"
            color="secondary"
            shadow="lg"
            fullWidth={false}
            className=" shadow-xl max-w-md lg:max-w-lg xl:max-w-xl w-full"
          >
            <TableHeader>
              {columns.map((column) => (
                <TableColumn key={column.key} className="w-1/3">
                  {column.label}
                </TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {currentItems.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="text-center">
                    <div
                      className={`flex items-center justify-center rounded-full w-8 h-8 ${
                        user.rank <= 5
                          ? user.rank === 1
                            ? "bg-violet-700"
                            : user.rank === 2
                            ? "bg-violet-500"
                            : user.rank === 3
                            ? "bg-violet-400"
                            : "bg-violet-300"
                          : "bg-gray-500"
                      }`}
                    >
                      {user.rank <= 5 && (
                        <span
                          className={`text-white ${
                            user.rank <= 3 ? "font-bold" : ""
                          }`}
                        >
                          {user.rank}
                        </span>
                      )}
                      {user.rank > 5 && (
                        <span className="text-white">{user.rank}</span>
                      )}
                      <HiOutlineMail className="text-white" />
                    </div>
                  </TableCell>
                  <TableCell>{user.nama_user}</TableCell>
                  <TableCell>{user.total_surat}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-8">
            <Pagination
              total={totalPages}
              page={currentPage}
              onChange={paginate}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Leaderboard;
