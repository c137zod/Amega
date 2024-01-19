import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import IpInfoComponent from "./IpInfoComponent";
import { useIp } from "@store/Context";
import fetchIpAndLocation from "@services/fetchIpAndLocation";

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

jest.mock("@store/Context", () => ({
  useIp: jest.fn(),
}));

jest.mock("@services/fetchIpAndLocation");

describe("IpInfoComponent", () => {
  it("displays IP and ISP information after successful fetching", async () => {
    const mockData = {
      ip: "192.168.1.1",
      isp: "Example ISP",
      latitude: 51.5074,
      longitude: -0.1278,
    };

    (useIp as jest.Mock).mockReturnValue({
      ip: mockData.ip,
      isp: mockData.isp,
      setIp: jest.fn(),
      setIsp: jest.fn(),
      setLocation: jest.fn(),
    });

    (fetchIpAndLocation as jest.Mock).mockResolvedValue(mockData);

    render(<IpInfoComponent />);

    await waitFor(() => {
      expect(fetchIpAndLocation).toHaveBeenCalled();
    });

    expect(screen.getByText(`IP: ${mockData.ip}`)).toBeInTheDocument();
    expect(screen.getByText(`ISP: ${mockData.isp}`)).toBeInTheDocument();
  });

  it("handles errors during fetchIpAndLocation", async () => {
    const mockError = new Error("Failed to fetch");
    (fetchIpAndLocation as jest.Mock).mockRejectedValue(mockError);

    (useIp as jest.Mock).mockReturnValue({
      ip: "",
      isp: "",
      setIp: jest.fn(),
      setIsp: jest.fn(),
      setLocation: jest.fn(),
    });

    render(<IpInfoComponent />);

    await waitFor(() => {
      expect(fetchIpAndLocation).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(
        screen.getByText(`Error: ${mockError.message}`)
      ).toBeInTheDocument();
    });
  });
});
