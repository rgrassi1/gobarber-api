import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IMailAddress {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMailAddress;
  from?: IMailAddress;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
