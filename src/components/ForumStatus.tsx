import  FORUM_STATUS from '@/constants/FORUM_STATUS';
import { Chip } from '@mui/material';

interface ForumStatusChipProps {
  status: string;
}
const ForumStatusChip = (props: ForumStatusChipProps) => {
  const { status } = props;

  switch (status) {
    case FORUM_STATUS.OPEN:
    	return <Chip label="Open" color="success" />;
		case FORUM_STATUS.CLOSE:
			return <Chip label="Closed" color="error" />;
    default:
      return null;
  }
};

export default ForumStatusChip;
