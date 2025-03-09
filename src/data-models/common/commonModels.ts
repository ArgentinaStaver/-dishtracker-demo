export interface PageInfo {
  total: number;
}

export interface Meta {
  page: PageInfo;
}

export interface Links {
  self: string;
  next: string | null;
}
