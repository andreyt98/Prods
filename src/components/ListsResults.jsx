import SliderCard from "./SliderCard";

import { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { CircularProgress } from "@mui/material";
import Notification from "@/components/common/Notification";
import SelectDropdown from "@/components/common/SelectDropdown";
import ConfirmDeleteModal from "./common/ConfirmDeleteModal";
import ListOptionsBar from "./common/ListOptionsBar";
import { selectFilterCategories } from "@/helpers/constants";

export const ListsResults = ({ listName, currentListData, setCurrentListData, listSelectedChange }) => {
  const { setEdit, checkedMedia, setCheckedMedia } = useContext(Context);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [originalListData, setOriginalListData] = useState([]);

  const [message, setMessage] = useState({ message: "", severity: "info", open: false });
  useEffect(() => {
    if (currentListData) {
      setOriginalListData(currentListData);
      setCurrentListData(currentListData);
      setLoading(false);
    }
  }, [listSelectedChange]);

  useEffect(() => {
    return () => {
      setCheckedMedia([]);
      setEdit(false);
    };
  }, []);

  return (
    <div className="results-container flex flex-col gap-4 xl:max-w-[1400px] overflow-auto h-full !pt-1 !pb-20 relative">
      <div className="options flex justify-between items-center w-full sticky top-[-4px] left-0 bg-black z-[10] pb-4">
        <span className="flex flex-col  text-left">
          <p>List</p>
          <p className=" text-[105%] lg:text-[125%] text-[var(--primary)] mb-2">{listName.toUpperCase()}</p>
          <SelectDropdown
            listSelectedChange={listSelectedChange}
            selectDefaultName="Filter by"
            selectOptions={selectFilterCategories}
            actionWhenSelectChange={(selected) => {
              if (!originalListData.length) return;
              switch (selected) {
                case "All":
                  setCurrentListData(originalListData);
                  break;
                case selectFilterCategories[0]:
                  setCurrentListData(originalListData.filter((obj) => obj.media_type === "movie"));
                  break;
                case selectFilterCategories[1]:
                  setCurrentListData(originalListData.filter((obj) => obj.media_type === "tv"));
                  break;
                default:
                  setCurrentListData(originalListData);
              }
            }}
          />
        </span>
        {currentListData && currentListData.length > 0 && (
          <>
            <ListOptionsBar setConfirmDialog={setConfirmDialog} />
            {confirmDialog && (
              <ConfirmDeleteModal
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
                listName={listName}
                extraActions={() => {
                  setEdit(false);
                }}
                elementsToDelete={checkedMedia}
                setElementsToDelete={setCheckedMedia}
                setMessage={setMessage}
              />
            )}
          </>
        )}
      </div>

      {loading ? (
        <div className="flex items-start justify-center h-full w-full min-h-screen pt-12">
          <CircularProgress color="inherit" size={100} />
        </div>
      ) : currentListData && currentListData.length > 0 ? (
        <div className="results z-[9]">
          {currentListData.map((result) => (
            <SliderCard result={result} changeMediaType={result.media_type} key={result.id} canBeEdited={true} isChecked={checkedMedia.includes(result.id.toString())} />
          ))}
        </div>
      ) : (
        <div className="w-full h-full mt-2">You will see your saved data here...</div>
      )}

      <Notification message={message} setMessage={setMessage} />
    </div>
  );
};
