"use client";

import { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchServices,
  addService,
  updateService,
  deleteService,
  selectServices,
  selectServicesLoading,
  selectServicesError,
  selectServicesPagination,
  Service,
} from "@/lib/redux/serviceSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AdminModal from "@/components/AdminModal";
import { toast } from "sonner";
import { Grid, List, Edit, Trash2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ConfirmationModal from "@/components/all/ConfirmationModal";
import ImageUploader from "@/components/all/ImageUploader";
import Pagination from "@/components/all/Pagination";

type ViewMode = "grid" | "table";

export default function AdminServicesPage() {
  const dispatch = useAppDispatch();
  const services = useAppSelector(selectServices);
  const loading = useAppSelector(selectServicesLoading);
  const error = useAppSelector(selectServicesError);
  const pagination = useAppSelector(selectServicesPagination);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [serviceIdToDelete, setServiceIdToDelete] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<Service>>({
    name: "",
    category: "",
    shortDescription: "",
    longDescription: "",
    image: "",
    tags: [],
  });
  const [newTag, setNewTag] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [displayMode, setDisplayMode] = useState<ViewMode>("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);

  // Debounced search effect
 useEffect(() => {
  const timeoutId = setTimeout(() => {
    setCurrentPage(1);
    dispatch(fetchServices({
      page: 1,
      limit: itemsPerPage,
      search: searchTerm.trim(),
    }));
  }, 300);

  return () => clearTimeout(timeoutId);
}, [searchTerm, itemsPerPage]);

  

  // Fetch data when page changes
  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage]);

  const fetchData = useCallback(() => {
    dispatch(fetchServices({
      page: currentPage,
      limit: itemsPerPage,
      search: searchTerm.trim(),
    }));
  }, [dispatch, currentPage, itemsPerPage, searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page
  };

  // Provide default pagination values to prevent undefined errors
const safePagination = pagination || {
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
};

  const openCreate = () => {
    setEditingService(null);
    setFormData({
      name: "",
      category: "",
      shortDescription: "",
      longDescription: "",
      image: "",
      tags: [],
    });
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (service: Service) => {
    setEditingService(service);
    setFormData({ ...service, tags: service.tags || [] });
    setErrors({});
    setModalOpen(true);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name?.trim()) newErrors.name = "Service name is required";
    if (!formData.category?.trim()) newErrors.category = "Category is required";
    if (!formData.shortDescription?.trim())
      newErrors.shortDescription = "Short description is required";
    if (!formData.longDescription?.trim())
      newErrors.longDescription = "Long description is required";
    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      const serviceData: Omit<Service, "id" | "timestamp"> = {
        name: formData.name || "",
        category: formData.category || "",
        shortDescription: formData.shortDescription || "",
        longDescription: formData.longDescription || "",
        image: formData.image || "",
        tags: formData.tags?.filter((tag) => tag.trim() !== "") || [],
      };

      if (editingService?.id) {
        await dispatch(updateService({ id: editingService.id, data: serviceData })).unwrap();
        toast.success("Service updated successfully!");
      } else {
        await dispatch(addService(serviceData)).unwrap();
        toast.success("Service added successfully!");
      }

      setModalOpen(false);
      setEditingService(null);
      fetchData(); // Refresh current page
    } catch (err: any) {
      toast.error(err.message || "Failed to save service.");
    }
  };

  const confirmDelete = (id: string) => {
    setServiceIdToDelete(id);
    setConfirmationOpen(true);
  };

  const handleDelete = async () => {
    if (!serviceIdToDelete) return;
    try {
      await dispatch(deleteService(serviceIdToDelete)).unwrap();
      toast.success("Service deleted successfully!");
      fetchData(); // Refresh current page
    } catch (err) {
      toast.error((err as Error).message || "Failed to delete service.");
    }
    setConfirmationOpen(false);
    setServiceIdToDelete(null);
  };

  const handleImageUploaded = useCallback((downloadURL: string) => {
    setFormData((prev) => ({ ...prev, image: downloadURL }));
  }, []);

  const addTag = () => {
    const tag = newTag.trim();
    if (tag && !(formData.tags || []).includes(tag)) {
      setFormData({ ...formData, tags: [...(formData.tags || []), tag] });
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: (formData.tags || []).filter((tag) => tag !== tagToRemove),
    });
  };

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((s) => (
        <Card key={s.id}>
          <CardHeader>
            <CardTitle>{s.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>{s.shortDescription}</p>
            <p><strong>Category:</strong> {s.category}</p>
            <div className="flex flex-wrap gap-1">
              {(s.tags || []).map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
            <div className="flex gap-2 pt-2">
              <Button size="sm" variant="outline" onClick={() => openEdit(s)}>
                <Edit className="h-4 w-4" /> Edit
              </Button>
              <Button size="sm" variant="destructive" onClick={() => confirmDelete(s.id)}>
                <Trash2 className="h-4 w-4" /> Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderTableView = () => (
    <Card>
      <CardHeader>
        <CardTitle>All Services ({safePagination.total})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border border-gray-200 rounded-md">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 text-left border-b">Name</th>
                <th className="p-2 text-left border-b">Category</th>
                <th className="p-2 text-left border-b">Short Description</th>
                <th className="p-2 text-left border-b">Tags</th>
                <th className="p-2 text-left border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 border-b">
                  <td className="p-2">{s.name}</td>
                  <td className="p-2">
                    <Badge variant="outline">{s.category}</Badge>
                  </td>
                  <td className="p-2">{s.shortDescription}</td>
                  <td className="p-2">
                    <div className="flex flex-wrap gap-1">
                      {(s.tags || []).map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openEdit(s)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => confirmDelete(s.id)}>
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
        <h1 className="text-2xl font-bold">Services Management</h1>
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
          <Button onClick={openCreate}>+ Add Service</Button>
        </div>
      </div>

      <Input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-md"
      />

      {loading && <p>Loading...</p>}
      
      {!loading && services.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No services found.</p>
        </div>
      )}

      {!loading && services.length > 0 && (
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
        message="Are you sure you want to delete this service? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setConfirmationOpen(false)}
      />

      {modalOpen && (
        <AdminModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          title={editingService ? "Edit Service" : "Create Service"}
          onSave={handleSave}
        >
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Name *</label>
              <Input
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
              <label className="block font-medium mb-1">Category *</label>
              <Input
                value={formData.category || ""}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
              {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
            </div>

            <div>
              <label className="block font-medium mb-1">Short Description *</label>
              <Textarea
                value={formData.shortDescription || ""}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                rows={2}
              />
              {errors.shortDescription && <p className="text-red-500 text-sm">{errors.shortDescription}</p>}
            </div>

            <div>
              <label className="block font-medium mb-1">Long Description *</label>
              <Textarea
                value={formData.longDescription || ""}
                onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                rows={4}
              />
              {errors.longDescription && <p className="text-red-500 text-sm">{errors.longDescription}</p>}
            </div>

            <div>
              <label className="block font-medium mb-1">Image URL</label>
              <ImageUploader
                key={`service-image-uploader-${formData.image}`}
                onImageUploaded={handleImageUploaded}
                currentImageUrl={formData.image}
                config={{
                  folder: "service-images",
                  maxSizeInMB: 5,
                  allowedTypes: ["image/jpeg", "image/png", "image/webp"],
                }}
                placeholder="Choose service image..."
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Tags</label>
              <div className="flex flex-wrap gap-1 mb-2">
                {(formData.tags || []).map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag} <X size={12} className="cursor-pointer" onClick={() => removeTag(tag)} />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="Add tag" />
                <Button size="sm" onClick={addTag}>Add</Button>
              </div>
            </div>
          </div>
        </AdminModal>
      )}
    </div>
  );
}
