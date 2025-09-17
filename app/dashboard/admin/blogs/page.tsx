"use client";

import { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { 
  fetchBlogsAdmin, addBlog, updateBlog, deleteBlog, togglePublishStatus, 
  selectBlogs, selectBlogsLoading, selectBlogsPagination, 
  Blog, CreateBlogParams, resetPagination
} from "@/lib/redux/blogSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import AdminModal from "@/components/AdminModal";
import { toast } from "sonner";
import { Grid, List, Edit, Trash2, X, Eye, EyeOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ConfirmationModal from "@/components/all/ConfirmationModal";
import ImageUploader from "@/components/all/ImageUploader";
import Pagination from "@/components/all/Pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { formatDate } from "@/lib/utils/date";

type ViewMode = "grid" | "table";
function formatDate(dateInput: string | Date | any): string {
  if (!dateInput) return 'N/A';
  
  let date: Date;
  
  // Handle Firestore timestamp objects
  if (dateInput && typeof dateInput === 'object') {
    if (dateInput.seconds) {
      // Firestore Timestamp format
      date = new Date(dateInput.seconds * 1000);
    } else if (dateInput.toDate && typeof dateInput.toDate === 'function') {
      // Firestore Timestamp with toDate method
      date = dateInput.toDate();
    } else if (dateInput._seconds) {
      // Alternative Firestore timestamp format
      date = new Date(dateInput._seconds * 1000);
    } else {
      date = new Date(dateInput);
    }
  } else {
    date = new Date(dateInput);
  }
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }
  
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminBlogsPage() {
  const dispatch = useAppDispatch();
  const blogs = useAppSelector(selectBlogs);
  const loading = useAppSelector(selectBlogsLoading);
  const pagination = useAppSelector(selectBlogsPagination);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [blogIdToDelete, setBlogIdToDelete] = useState<string | null>(null);
  const [displayMode, setDisplayMode] = useState<ViewMode>("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filterStatus, setFilterStatus] = useState<boolean | undefined>(undefined);

  const [formData, setFormData] = useState<Partial<Blog>>({
    title: "", content: "", author: "", category: "", slug: "", image: "",
    tags: [], isPublished: false, seo: { title: "", description: "", keywords: [] }
  });
  const [newTag, setNewTag] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch data with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1);
      fetchData();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, itemsPerPage, filterStatus]);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = useCallback(() => {
    dispatch(fetchBlogsAdmin({
      page: currentPage,
      limit: itemsPerPage,
      search: searchTerm.trim(),
      isPublished: filterStatus
    }));
  }, [dispatch, currentPage, itemsPerPage, searchTerm, filterStatus]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    dispatch(resetPagination());
  };

  const safePagination = pagination || {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  };

  const resetForm = () => {
    setFormData({
      title: "", content: "", author: "", category: "", slug: "", image: "",
      tags: [], isPublished: false, seo: { title: "", description: "", keywords: [] }
    });
    setErrors({});
  };

  const openCreate = () => {
    setEditingBlog(null);
    resetForm();
    setModalOpen(true);
  };

  const openEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({ ...blog, tags: blog.tags || [], seo: blog.seo || { title: "", description: "", keywords: [] } });
    setErrors({});
    setModalOpen(true);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title?.trim()) newErrors.title = "Title is required";
    if (!formData.content?.trim()) newErrors.content = "Content is required";
    if (!formData.author?.trim()) newErrors.author = "Author is required";
    if (!formData.category?.trim()) newErrors.category = "Category is required";
    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      const blogData: CreateBlogParams = {
        title: formData.title || "",
        content: formData.content || "",
        author: formData.author || "",
        category: formData.category || "",
        slug: formData.slug || formData.title?.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "-") || "",
        image: formData.image || "",
        tags: formData.tags?.filter(tag => tag.trim()) || [],
        isPublished: formData.isPublished || false,
        seo: formData.seo || { title: "", description: "", keywords: [] }
      };

      if (editingBlog?.id) {
        await dispatch(updateBlog({ id: editingBlog.id, data: blogData })).unwrap();
        toast.success("Blog updated successfully!");
      } else {
        await dispatch(addBlog(blogData)).unwrap();
        toast.success("Blog created successfully!");
      }

      setModalOpen(false);
      fetchData();
    } catch (err: any) {
      toast.error(err.message || "Failed to save blog.");
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      await dispatch(togglePublishStatus({ id, isPublished: !currentStatus })).unwrap();
      toast.success(`Blog ${!currentStatus ? "published" : "unpublished"} successfully!`);
      fetchData();
    } catch (err: any) {
      toast.error(err.message || "Failed to toggle publish status.");
    }
  };

  const handleDelete = async () => {
    if (!blogIdToDelete) return;
    try {
      await dispatch(deleteBlog(blogIdToDelete)).unwrap();
      toast.success("Blog deleted successfully!");
      fetchData();
    } catch (err) {
      toast.error((err as Error).message || "Failed to delete blog.");
    }
    setConfirmationOpen(false);
    setBlogIdToDelete(null);
  };

  const addTag = () => {
    const tag = newTag.trim();
    if (tag && !formData.tags?.includes(tag)) {
      setFormData({ ...formData, tags: [...(formData.tags || []), tag] });
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags?.filter(tag => tag !== tagToRemove) });
  };

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <Card key={blog.id} className="flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg line-clamp-2">{blog.title}</CardTitle>
              <Badge variant={blog.isPublished ? "default" : "secondary"} className="flex items-center gap-1">
                {blog.isPublished ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                {blog.isPublished ? "Published" : "Draft"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-grow space-y-2 text-sm">
            {blog.image && (
              <div className="w-full h-32 rounded-md overflow-hidden bg-gray-100">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <p className="text-sm text-gray-600">{blog.author} • {blog.category}</p>
            <p className="text-xs text-gray-500">{formatDate(blog.timestamp)}</p>
            <div className="flex flex-wrap gap-1">
              {(blog.tags || []).slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {(blog.tags || []).length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{(blog.tags || []).length - 3}
                </Badge>
              )}
            </div>
          </CardContent>
          <div className="p-4 border-t flex flex-wrap gap-2 justify-between">
            <Button size="sm" variant="outline" onClick={() => openEdit(blog)}>
              <Edit className="h-4 w-4 mr-1" /> Edit
            </Button>
            <Button
              size="sm"
              variant={blog.isPublished ? "secondary" : "default"}
              onClick={() => handleTogglePublish(blog.id, blog.isPublished)}
            >
              {blog.isPublished ? (
                <>
                  <EyeOff className="h-4 w-4 mr-1" /> Unpublish
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-1" /> Publish
                </>
              )}
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => {
                setBlogIdToDelete(blog.id);
                setConfirmationOpen(true);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderTableView = () => (
    <Card>
      <CardHeader>
        <CardTitle>All Blogs ({safePagination.total})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border border-gray-200 rounded-md">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left border-b">Title</th>
                <th className="p-3 text-left border-b">Author</th>
                <th className="p-3 text-left border-b">Category</th>
                <th className="p-3 text-left border-b">Status</th>
                <th className="p-3 text-left border-b">Created</th>
                <th className="p-3 text-left border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50 border-b">
                  <td className="p-3">
                    <div className="flex items-start gap-3">
                      {blog.image && (
                        <img 
                          src={blog.image} 
                          alt={blog.title} 
                          className="w-16 h-12 object-cover rounded flex-shrink-0"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="font-medium line-clamp-2 max-w-[300px]">
                          {blog.title}
                        </div>
                        {blog.tags && blog.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {blog.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {blog.tags.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{blog.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-3">{blog.author}</td>
                  <td className="p-3">
                    <Badge variant="outline">{blog.category}</Badge>
                  </td>
                  <td className="p-3">
                    {blog.isPublished ? (
                      <Badge variant="default" className="flex items-center gap-1 w-fit">
                        <Eye className="h-3 w-3" /> Published
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                        <EyeOff className="h-3 w-3" /> Draft
                      </Badge>
                    )}
                  </td>
                  <td className="p-3 text-sm">{formatDate(blog.timestamp)}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openEdit(blog)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant={blog.isPublished ? "secondary" : "default"}
                        onClick={() => handleTogglePublish(blog.id, blog.isPublished)}
                      >
                        {blog.isPublished ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        onClick={() => {
                          setBlogIdToDelete(blog.id);
                          setConfirmationOpen(true);
                        }}
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
        <h1 className="text-2xl font-bold">Blog Management</h1>
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
          <Button onClick={openCreate}>+ Add Blog</Button>
        </div>
      </div>

      <div className="flex gap-4">
        <Input placeholder="Search blogs..." value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} className="max-w-md" />
        <Select value={filterStatus === undefined ? "all" : filterStatus.toString()}
          onValueChange={(value) => setFilterStatus(value === "all" ? undefined : value === "true")}>
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="true">Published</SelectItem>
            <SelectItem value="false">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading && <p>Loading...</p>}
      
      {!loading && blogs.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No blogs found.</p>
        </div>
      )}

      {!loading && blogs.length > 0 && (
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
        message="Are you sure you want to delete this blog post? This action cannot be undone." 
        onConfirm={handleDelete}
        onCancel={() => setConfirmationOpen(false)} 
      />

      {modalOpen && (
        <AdminModal 
          open={modalOpen} 
          onOpenChange={setModalOpen}
          title={editingBlog ? "Edit Blog" : "Create Blog"} 
          onSave={handleSave}
          size="large"
        >
          <div className="space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Title *</label>
                <Input value={formData.title || ""} 
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
              </div>
              <div>
                <label className="block font-medium mb-1">Slug</label>
                <Input value={formData.slug || ""}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Author *</label>
                <Input value={formData.author || ""}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })} />
                {errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}
              </div>
              <div>
                <label className="block font-medium mb-1">Category *</label>
                <Input value={formData.category || ""}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
                {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1">Content *</label>
              <Textarea value={formData.content || ""} rows={8}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="font-mono text-sm" />
              {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
            </div>

            <div>
              <label className="block font-medium mb-1">Featured Image</label>
              <ImageUploader 
                onImageUploaded={(url) => setFormData({ ...formData, image: url })}
                currentImageUrl={formData.image} 
                config={{ 
                  folder: "blog-images", 
                  maxSizeInMB: 5,
                  allowedTypes: ["image/jpeg", "image/png", "image/webp"]
                }}
                placeholder="Choose blog featured image..."
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Tags</label>
              <div className="flex flex-wrap gap-1 mb-2">
                {formData.tags?.map(tag => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X
                      size={12}
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input 
                  value={newTag} 
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag" 
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} 
                />
                <Button size="sm" onClick={addTag}>Add</Button>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">SEO Settings</h3>
              <div className="space-y-3">
                <div>
                  <label className="block font-medium mb-1">SEO Title</label>
                  <Input
                    value={formData.seo?.title || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        seo: { ...formData.seo, title: e.target.value },
                      })
                    }
                    placeholder="SEO optimized title"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">Meta Description</label>
                  <Textarea
                    value={formData.seo?.description || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        seo: { ...formData.seo, description: e.target.value },
                      })
                    }
                    rows={3}
                    placeholder="SEO meta description"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch 
                checked={formData.isPublished || false}
                onCheckedChange={(checked) => setFormData({ ...formData, isPublished: checked })} 
              />
              <label className="font-medium">Publish immediately</label>
            </div>
          </div>
        </AdminModal>
      )}
    </div>
  );
}
