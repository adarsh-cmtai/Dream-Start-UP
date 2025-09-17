"use client";

import { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchTrainings,
  addTraining,
  updateTraining,
  deleteTraining,
  selectTrainings,
  selectTrainingsLoading,
  selectTrainingsError,
  selectTrainingsPagination,
  Training,
  CreateTrainingParams,
  UpdateTrainingParams,
  resetPagination,
} from "@/lib/redux/trainingSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AdminModal from "@/components/AdminModal";
import { toast } from "sonner";
import { Grid, List, Edit, Trash2, X, PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ConfirmationModal from "@/components/all/ConfirmationModal";
import Pagination from "@/components/all/Pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type ViewMode = "grid" | "table";

export default function AdminTrainingsPage() {
  const dispatch = useAppDispatch();
  const trainings = useAppSelector(selectTrainings);
  const loading = useAppSelector(selectTrainingsLoading);
  const error = useAppSelector(selectTrainingsError);
  const pagination = useAppSelector(selectTrainingsPagination);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTraining, setEditingTraining] = useState<Training | null>(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [trainingIdToDelete, setTrainingIdToDelete] = useState<string | null>(
    null
  );

  const [formData, setFormData] = useState<
    Partial<Training> & {
      seoTitle?: string;
      seoDescription?: string;
      seoKeywords?: string;
    }
  >({
    title: "",
    description: "",
    ytLink: "",
    category: "",
    level: "beginner",
    duration: 0,
    isActive: true,
    seo: ",",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [displayMode, setDisplayMode] = useState<ViewMode>("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filterCategory, setFilterCategory] = useState<string | undefined>(
    undefined
  );
  const [filterLevel, setFilterLevel] = useState<
    "beginner" | "intermediate" | "advanced" | undefined
  >(undefined);

  // Fetch data on initial load and when pagination/filters change
  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage, filterCategory, filterLevel]);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1); // Reset page when search term changes
      fetchData(true); // Force refetch with current search term
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]); // Only re-run when searchTerm changes

  const fetchData = useCallback(
    (resetPage: boolean = false) => {
      const pageToFetch = resetPage ? 1 : currentPage;
      dispatch(
        fetchTrainings({
          page: pageToFetch,
          limit: itemsPerPage,
          category: filterCategory,
          level: filterLevel,
          // Note: Your fetchTrainings thunk doesn't currently support 'search',
          // but I'll add a placeholder comment for where it would go if it did.
          // search: searchTerm.trim(), // <--- If your API supported search
        })
      );
    },
    [
      dispatch,
      currentPage,
      itemsPerPage,
      filterCategory,
      filterLevel,
      searchTerm,
    ]
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page
    dispatch(resetPagination()); // Reset pagination in store to update totalPages correctly
  };

  // Provide default pagination values to prevent undefined errors
  const safePagination = pagination || {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  };

  const openCreate = () => {
    setEditingTraining(null);
    setFormData({
      title: "",
      description: "",
      ytLink: "",
      category: "",
      level: "beginner",
      duration: 0,
      isActive: true,
      seo: "",
    });
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (training: Training) => {
    setEditingTraining(training);
    setFormData({
      ...training,
      duration: training.duration || 0,
      isActive: training.isActive ?? true,
      seo: training.seo || "",
    });
    setErrors({});
    setModalOpen(true);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title?.trim()) newErrors.title = "Title is required";
    if (!formData.description?.trim())
      newErrors.description = "Description is required";
    if (!formData.ytLink?.trim()) newErrors.ytLink = "YouTube Link is required";
    if (!formData.category?.trim()) newErrors.category = "Category is required";
    if (!formData.level) newErrors.level = "Level is required";
    if (formData.duration === undefined || formData.duration < 0)
      newErrors.duration = "Duration must be a non-negative number";
    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      const seoData =
        formData.seoTitle || formData.seoDescription || formData.seoKeywords
          ? {
              title: formData.seoTitle || undefined,
              description: formData.seoDescription || undefined,
              keywords:
                formData.seoKeywords?.split(",").map((k) => k.trim()) ||
                undefined,
            }
          : undefined;

      const trainingData: Omit<CreateTrainingParams, "seo"> & {
        seo?: { [key: string]: any };
      } = {
        title: formData.title || "",
        description: formData.description || "",
        ytLink: formData.ytLink || "",
        category: formData.category || "",
        level: formData.level || "beginner",
        duration: formData.duration || 0,
        isActive: formData.isActive ?? true,
        ...(seoData && { seo: seoData }),
      };

      if (editingTraining?.id) {
        await dispatch(
          updateTraining({
            id: editingTraining.id,
            data: trainingData as UpdateTrainingParams["data"],
          })
        ).unwrap();
        toast.success("Training updated successfully!");
      } else {
        await dispatch(
          addTraining(trainingData as CreateTrainingParams)
        ).unwrap();
        toast.success("Training added successfully!");
      }

      setModalOpen(false);
      setEditingTraining(null);
      fetchData(); // Refresh current page
    } catch (err: any) {
      toast.error(err.message || "Failed to save training.");
    }
  };

  const confirmDelete = (id: string) => {
    setTrainingIdToDelete(id);
    setConfirmationOpen(true);
  };

  const handleDelete = async () => {
    if (!trainingIdToDelete) return;
    try {
      await dispatch(deleteTraining(trainingIdToDelete)).unwrap();
      toast.success("Training deleted successfully!");
      fetchData(); // Refresh current page
    } catch (err) {
      toast.error((err as Error).message || "Failed to delete training.");
    }
    setConfirmationOpen(false);
    setTrainingIdToDelete(null);
  };

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trainings
        .filter((t) => t.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .map((t) => (
          <Card key={t.id} className="flex flex-col">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">{t.title}</CardTitle>
              <Badge variant={t.isActive ? "default" : "secondary"}>
                {t.isActive ? "Active" : "Inactive"}
              </Badge>
            </CardHeader>
            <CardContent className="flex-grow space-y-2 text-sm">
              <p className="text-gray-600 line-clamp-2">{t.description}</p>
              <div className="flex flex-wrap gap-2 items-center">
                <Badge variant="outline">{t.category}</Badge>
                <Badge variant="secondary">{t.level}</Badge>
                {t.duration && (
                  <Badge variant="secondary">{t.duration} mins</Badge>
                )}
                {t.ytLink && (
                  <a
                    href={t.ytLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:underline"
                  >
                    <PlayCircle className="h-4 w-4 mr-1" /> Watch
                  </a>
                )}
              </div>
            </CardContent>
            <div className="p-4 border-t flex gap-2">
              <Button size="sm" variant="outline" onClick={() => openEdit(t)}>
                <Edit className="h-4 w-4 mr-1" /> Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => confirmDelete(t.id)}
              >
                <Trash2 className="h-4 w-4 mr-1" /> Delete
              </Button>
            </div>
          </Card>
        ))}
    </div>
  );

  const renderTableView = () => (
    <Card>
      <CardHeader>
        <CardTitle>All Trainings ({safePagination.total})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border border-gray-200 rounded-md">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 text-left border-b">Title</th>
                <th className="p-2 text-left border-b">Category</th>
                <th className="p-2 text-left border-b">Level</th>
                <th className="p-2 text-left border-b">Duration</th>
                <th className="p-2 text-left border-b">Active</th>
                <th className="p-2 text-left border-b">YouTube Link</th>
                <th className="p-2 text-left border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trainings
                .filter((t) =>
                  t.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50 border-b">
                    <td className="p-2 font-medium">{t.title}</td>
                    <td className="p-2">
                      <Badge variant="outline">{t.category}</Badge>
                    </td>
                    <td className="p-2">
                      <Badge variant="secondary">{t.level}</Badge>
                    </td>
                    <td className="p-2">{t.duration || "N/A"} mins</td>
                    <td className="p-2">
                      <Badge variant={t.isActive ? "default" : "secondary"}>
                        {t.isActive ? "Yes" : "No"}
                      </Badge>
                    </td>
                    <td className="p-2">
                      {t.ytLink ? (
                        <a
                          href={t.ytLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center"
                        >
                          <PlayCircle className="h-4 w-4 mr-1" /> Watch
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="p-2">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEdit(t)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => confirmDelete(t.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Trainings Management</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Items per page:</label>
            <select
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="flex items-center gap-2 border rounded-md p-1">
            <Button
              size="sm"
              variant={displayMode === "grid" ? "default" : "ghost"}
              onClick={() => setDisplayMode("grid")}
              className="h-8 px-3"
            >
              <Grid className="h-4 w-4 mr-1" /> Grid
            </Button>
            <Button
              size="sm"
              variant={displayMode === "table" ? "default" : "ghost"}
              onClick={() => setDisplayMode("table")}
              className="h-8 px-3"
            >
              <List className="h-4 w-4 mr-1" /> Table
            </Button>
          </div>
          <Button onClick={openCreate}>+ Add Training</Button>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <Input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />    
      </div>

      {loading && <p>Loading trainings...</p>}

      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && trainings.length === 0 && !error && (
        <div className="text-center py-8">
          <p className="text-gray-500">No trainings found.</p>
        </div>
      )}

      {!loading && trainings.length > 0 && (
        <>
          {displayMode === "grid" ? renderGridView() : renderTableView()}

          {safePagination.totalPages > 0 && (
            <Pagination
              currentPage={safePagination.page}
              totalPages={safePagination.totalPages}
              onPageChange={handlePageChange}
              totalItems={safePagination.total}
              itemsPerPage={safePagination.limit}
            />
          )}
        </>
      )}

      <ConfirmationModal
        open={confirmationOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this training? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setConfirmationOpen(false)}
      />

      {modalOpen && (
        <AdminModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          title={editingTraining ? "Edit Training" : "Create Training"}
          onSave={handleSave}
        >
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Title *</label>
              <Input
                value={formData.title || ""}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Description *</label>
              <Textarea
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">YouTube Link </label>
              <Input
                value={formData.ytLink || ""}
                onChange={(e) =>
                  setFormData({ ...formData, ytLink: e.target.value })
                }
              />
              {errors.ytLink && (
                <p className="text-red-500 text-sm">{errors.ytLink}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Category *</label>
              <Input
                value={formData.category || ""}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Level *</label>
              <Select
                value={formData.level}
                onValueChange={(
                  value: "beginner" | "intermediate" | "advanced"
                ) => setFormData({ ...formData, level: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              {errors.level && (
                <p className="text-red-500 text-sm">{errors.level}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">
                Duration (minutes)
              </label>
              <Input
                type="number"
                value={formData.duration || 0}
                onChange={(e) =>
                  setFormData({ ...formData, duration: Number(e.target.value) })
                }
              />
              {errors.duration && (
                <p className="text-red-500 text-sm">{errors.duration}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive-switch"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isActive: checked })
                }
              />
              <Label htmlFor="isActive-switch">Is Active</Label>
            </div>

            <h3 className="text-lg font-semibold mt-6">
              SEO Information (Optional)
            </h3>
            <div className="space-y-4 border p-4 rounded-md">
              <div>
                <label className="block font-medium mb-1">SEO</label>
                <Input
                  value={formData.seo || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, seo: e.target.value })
                  }
                  placeholder="seo for search engines"
                />
              </div>
            </div>
          </div>
        </AdminModal>
      )}
    </div>
  );
}
