import React, { useEffect, useState } from "react";
import "./style.scss";
import { InputGroup, Button, Spinner } from "react-bootstrap";
import { Table } from "../Table";
import { Filter } from "../Filter";
import { API } from "../../api";
import { refactorReport } from "./refactor-report";
import { Template } from "../template";

export const YearReport = (props: any) => {
  // const [category, setCategory] = useState("boats");

  const [reportData, setReportData] = useState<any[]>([]);
  const [disableMonth, setDisableMonth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    setLoading(true);
    API.get_report({ category: "boats", year: "2020" }).then((x) => {
      setCategories(x.data.data.categories);
      setReportData(refactorReport(x.data.data));
      setLoading(false);
    });
  }, []);

  const view = reportData.map((x, i) =>
    x.filter((x: any, i: any) => {
      if (i === 6) {
        return disableMonth;
      }
      return true;
    })
  );

  const filterHandle = (values: any) => {
    setLoading(true);
    API.get_report(values).then((x) => {
      setReportData(refactorReport(x.data.data));
      setLoading(false);
    });
    // alert(JSON.stringify(values));
  };

  return (
    // <div className="container-fluid">
    <Template title="Годовой отчет">
      {/* <h1>asd</h1> */}
      <Filter
        filterHandle={filterHandle}
        reportData={reportData}
        categories={categories}
      />
      <InputGroup className="mb-3">
        <Button
          variant={disableMonth ? "primary" : "outline-primary"}
          onClick={() => setDisableMonth(!disableMonth)}
        >
          Продажи/Мес
        </Button>
      </InputGroup>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <>
          <Table reportData={view} />
        </>
      )}
    </Template>
    // </div>
  );
};
