const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/colors`;

export class ColorsApi {
  async getColorName(hex: string): Promise<string> {
    const escaped = encodeURIComponent(hex);
    const resp = await fetch(`${API_ENDPOINT}/${escaped}`);
    if (!resp.ok) {
      throw new Error(`Response status: ${resp.status}`);
    }

    return resp.text();
  }
}
