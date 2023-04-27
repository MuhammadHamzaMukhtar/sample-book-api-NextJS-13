import AddForm from "./compnents/AddForm";
import ApiSummaryTable from "./compnents/ApiSummaryTable";
import BooksTable from "./compnents/BooksTable";

export default async function Home() {
  return (
    <>
    <h2 className="text-center font-extrabold text-4xl">Next JS Api Crud</h2>
      {/* <div>
        <div className="flex justify-center">
          <div>
            <AddForm />
            <div className="flex justify-center items-center">
              <p className="text-3xl items-center"> List of Books </p>
            </div>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/1">
              <BooksTable />
            </div>
          </div>
        </div>
      </div> */}
      <ApiSummaryTable />
    </>
  );
}
