import { useState } from "react";
import { useAuthStore } from "../../../stores/auth.store";

const Relation = () => {
  const { userInfo } = useAuthStore();
  const [relationInfo, setRelationInfo] = useState(null);

  return <div>Relation</div>;
};

export default Relation;
