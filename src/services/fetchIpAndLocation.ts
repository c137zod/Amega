export interface IpLocationData {
  ip: string;
  isp: string;
  latitude: number;
  longitude: number;
}

async function fetchIpAndLocation(ipAddress?: string): Promise<IpLocationData> {
  try {
    const apiUrl = process.env.REACT_APP_WHO_IS_API_URL;
    
    if (!apiUrl) {
      throw new Error('REACT_APP_WHO_IS_API_URL is not defined in environment variables');
    }

    const url = ipAddress
      ? `${apiUrl}${ipAddress}`
      : apiUrl;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error('Failed to fetch IP location data');
    }

    return {
      ip: data.ip,
      isp: data.isp,
      latitude: data.latitude,
      longitude: data.longitude,
    };
  } catch (error) {
    console.error('Error fetching IP and location:', error);
    throw error;
  }
}

export default fetchIpAndLocation;