import  PAPER_STATUS from '@/constants/PAPER_STATUS';
import { Chip } from '@mui/material';

interface PaperStatusChipProps {
  status: string;
}
const PaperStatusChip = (props: PaperStatusChipProps) => {
  const { status } = props;

  switch (status) {
    case PAPER_STATUS.PENDING:
      return <Chip label="Pending" color="warning" />;
		case PAPER_STATUS.REVIEWING:
			return <Chip label="Reviewing" color="primary" />;
		case PAPER_STATUS.ACCEPTED:
      return <Chip label="Accepted" color="success" />;
		case PAPER_STATUS.RESUBMISSION:
			return <Chip label="Resubmission" color="error" />;
    default:
      return null;
  }
};

export default PaperStatusChip;
