//thư viện JavaScript để xử lý và định dạng ngày tháng
// theo cách hiển thị thời gian tương đối và sử dụng tiếng Việt
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";

dayjs.extend(relativeTime);
dayjs.locale("vi");

export default dayjs;