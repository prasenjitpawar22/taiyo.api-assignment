export type Contact = {
  firstName: string;
  lastName: string;
  status: status;
};

export enum status {
  active,
  inactive,
}
