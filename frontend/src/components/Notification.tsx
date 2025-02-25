type Props = {
  notification: {
    status: "error" | "success";
    message: string;
  };
};

const Notification = ({ notification }: Props) => {
  if (!notification) return null;
  return <div className={notification.status}>{notification.message}</div>;
};

export default Notification;
