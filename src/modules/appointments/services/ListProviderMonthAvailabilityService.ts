import { injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
export default class ListProviderMonthAvailabilityService {
  constructor() {}

  public async execute({ user_id, month, year }: IRequest): Promise<IResponse> {
    return [{ day: 1, available: false }];
  }
}
