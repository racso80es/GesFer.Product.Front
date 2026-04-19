import * as React from "react";
import { render } from "@testing-library/react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../../../components/ui/table";

describe("Table UI Components", () => {
  it("renders Table correctly with data-testid and specific classes", () => {
    const { getByTestId } = render(
      <Table data-testid="table-test" className="custom-table-class" />
    );
    const tableEl = getByTestId("table-test");
    expect(tableEl).toBeInTheDocument();
    expect(tableEl.tagName).toBe("TABLE");
    expect(tableEl).toHaveClass("custom-table-class");
    expect(tableEl).toHaveClass("w-full");
  });

  it("renders TableHeader correctly", () => {
    const { getByTestId } = render(
      <Table>
        <TableHeader data-testid="table-header-test" className="custom-header-class" />
      </Table>
    );
    const el = getByTestId("table-header-test");
    expect(el).toBeInTheDocument();
    expect(el.tagName).toBe("THEAD");
    expect(el).toHaveClass("custom-header-class");
  });

  it("renders TableBody correctly", () => {
    const { getByTestId } = render(
      <Table>
        <TableBody data-testid="table-body-test" className="custom-body-class" />
      </Table>
    );
    const el = getByTestId("table-body-test");
    expect(el).toBeInTheDocument();
    expect(el.tagName).toBe("TBODY");
    expect(el).toHaveClass("custom-body-class");
  });

  it("renders TableRow correctly", () => {
    const { getByTestId } = render(
      <Table>
        <TableBody>
          <TableRow data-testid="table-row-test" className="custom-row-class" />
        </TableBody>
      </Table>
    );
    const el = getByTestId("table-row-test");
    expect(el).toBeInTheDocument();
    expect(el.tagName).toBe("TR");
    expect(el).toHaveClass("custom-row-class");
  });

  it("renders TableHead correctly", () => {
    const { getByTestId } = render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead data-testid="table-head-test" className="custom-th-class" />
          </TableRow>
        </TableHeader>
      </Table>
    );
    const el = getByTestId("table-head-test");
    expect(el).toBeInTheDocument();
    expect(el.tagName).toBe("TH");
    expect(el).toHaveClass("custom-th-class");
  });

  it("renders TableCell correctly", () => {
    const { getByTestId } = render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell data-testid="table-cell-test" className="custom-td-class" />
          </TableRow>
        </TableBody>
      </Table>
    );
    const el = getByTestId("table-cell-test");
    expect(el).toBeInTheDocument();
    expect(el.tagName).toBe("TD");
    expect(el).toHaveClass("custom-td-class");
  });
});
