import { useCallback, useEffect, useState } from "react";
import type { Class } from "../components/type";
import { getClasses } from "../services/services";

export function useClasses() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchClasses = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getClasses();
      setClasses(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  return { classes, loading, fetchClasses };
}
