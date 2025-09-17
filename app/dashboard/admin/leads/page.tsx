"use client";

import { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchLeads,
  updateLeadStatus,
  deleteLead,
  selectLeads,
  selectLeadsLoading,
  selectLeadsError,
  selectLeadsPagination,
  Lead,
  UpdateLeadStatusParams,
  resetPagination,
  fetchLeadById,
} from "@/lib/redux/leadSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AdminModal from "@/components/AdminModal";
import { toast } from "sonner";
import { Grid, List, Eye, Trash2, CheckCircle, Clock, Hourglass, XCircle, Phone, Mail, MessageSquare } from "lucide-react";
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

type ViewMode = "grid" | "table";
type LeadStatus = 'pending' | 'in_progress' | 'resolved' | 'closed';

// Fixed date formatter with proper validation
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

export default function AdminLeadsPage() {
  const dispatch = useAppDispatch();
  const leads = useAppSelector(selectLeads);
  const loading = useAppSelector(selectLeadsLoading);
  const error = useAppSelector(selectLeadsError);
  const pagination = useAppSelector(selectLeadsPagination);

  const [modalOpen, setModalOpen] = useState(false);
  const [viewingLead, setViewingLead] = useState<Lead | null>(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [leadIdToDelete, setLeadIdToDelete] = useState<string | null>(null);

  const [displayMode, setDisplayMode] = useState<ViewMode>("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filterStatus, setFilterStatus] = useState<LeadStatus | undefined>(undefined);

  // Fetch data on initial load and when pagination/filters change
  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage, filterStatus]);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1);
      fetchData(true);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const fetchData = useCallback(
    (resetPage: boolean = false) => {
      const pageToFetch = resetPage ? 1 : currentPage;
      dispatch(
        fetchLeads({
          page: pageToFetch,
          limit: itemsPerPage,
          status: filterStatus,
          search: searchTerm.trim(),
        })
      );
    },
    [dispatch, currentPage, itemsPerPage, filterStatus, searchTerm]
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    dispatch(resetPagination());
  };

  // Provide default pagination values to prevent undefined errors
  const safePagination = pagination || {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
  };

  const openViewModal = async (lead: Lead) => {
    setViewingLead(lead);
    setModalOpen(true);
    
    if (lead.id) {
      try {
        const result = await dispatch(fetchLeadById(lead.id)).unwrap();
        setViewingLead(result);
      } catch (err) {
        toast.error("Failed to load full lead details.");
        console.error("Failed to fetch lead by ID:", err);
      }
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: LeadStatus) => {
    try {
      await dispatch(updateLeadStatus({ id, status: newStatus })).unwrap();
      toast.success(`Lead status updated to ${newStatus.replace('_', ' ')}!`);
      fetchData();
      if (viewingLead?.id === id) {
        setViewingLead(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update lead status.");
    }
  };

  const confirmDelete = (id: string) => {
    setLeadIdToDelete(id);
    setConfirmationOpen(true);
  };

  const handleDelete = async () => {
    if (!leadIdToDelete) return;
    try {
      await dispatch(deleteLead(leadIdToDelete)).unwrap();
      toast.success("Lead deleted successfully!");
      fetchData();
    } catch (err) {
      toast.error((err as Error).message || "Failed to delete lead.");
    }
    setConfirmationOpen(false);
    setLeadIdToDelete(null);
  };

  // Fixed badge variant function - using only standard variants
  const getStatusBadgeVariant = (status: LeadStatus): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'pending':
        return 'secondary';
      case 'in_progress':
        return 'outline';
      case 'resolved':
        return 'default';
      case 'closed':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getStatusIcon = (status: LeadStatus) => {
    switch (status) {
      case 'pending':
        return <Hourglass className="h-4 w-4" />;
      case 'in_progress':
        return <Clock className="h-4 w-4" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4" />;
      case 'closed':
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {leads.map((l) => (
        <Card key={l.id} className="flex flex-col">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">{l.name}</CardTitle>
            <Badge variant={getStatusBadgeVariant(l.status)} className="capitalize flex items-center gap-1">
              {getStatusIcon(l.status)} {l.status.replace(/_/g, ' ')}
            </Badge>
          </CardHeader>
          <CardContent className="flex-grow space-y-2 text-sm">
            <p className="flex items-center gap-2 text-gray-700">
              <Mail className="h-4 w-4 text-gray-500" /> {l.email}
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <Phone className="h-4 w-4 text-gray-500" /> {l.phoneNumber}
            </p>
            {l.message && (
              <p className="flex items-start gap-2 text-gray-600 line-clamp-2">
                <MessageSquare className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" /> {l.message}
              </p>
            )}
            <p className="text-xs text-gray-500">
              Submitted: {formatDate(l.timestamp)}
            </p>
          </CardContent>
          <div className="p-4 border-t flex gap-2 justify-between">
            <Button size="sm" variant="outline" onClick={() => openViewModal(l)}>
              <Eye className="h-4 w-4 mr-1" /> View Details
            </Button>
            <Select value={l.status} onValueChange={(value: LeadStatus) => handleUpdateStatus(l.id, value)}>
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="Update Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" variant="destructive" onClick={() => confirmDelete(l.id)}>
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
        <CardTitle>All Leads ({safePagination.total})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border border-gray-200 rounded-md">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 text-left border-b">Name</th>
                <th className="p-2 text-left border-b">Email</th>
                <th className="p-2 text-left border-b">Phone</th>
                <th className="p-2 text-left border-b">Message</th>
                <th className="p-2 text-left border-b">Status</th>
                <th className="p-2 text-left border-b">Submitted</th>
                <th className="p-2 text-left border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className="hover:bg-gray-50 border-b">
                  <td className="p-2 font-medium">{l.name}</td>
                  <td className="p-2">{l.email}</td>
                  <td className="p-2">{l.phoneNumber}</td>
                  <td className="p-2 line-clamp-1 max-w-[200px]">{l.message || 'N/A'}</td>
                  <td className="p-2">
                    <Badge variant={getStatusBadgeVariant(l.status)} className="capitalize flex items-center gap-1">
                      {getStatusIcon(l.status)} {l.status.replace(/_/g, ' ')}
                    </Badge>
                  </td>
                  <td className="p-2 text-xs">
                    {formatDate(l.timestamp)}
                  </td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openViewModal(l)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Select value={l.status} onValueChange={(value: LeadStatus) => handleUpdateStatus(l.id, value)}>
                        <SelectTrigger className="w-[100px] h-8">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button size="sm" variant="destructive" onClick={() => confirmDelete(l.id)}>
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
        <h1 className="text-2xl font-bold">Leads Management</h1>
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
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <Input
          type="text"
          placeholder="Search by name, email, phone, or message"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <Select
          value={filterStatus}
          onValueChange={(value) => setFilterStatus(value === "all" ? undefined : (value as LeadStatus))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading && <p>Loading leads...</p>}

      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && leads.length === 0 && !error && (
        <div className="text-center py-8">
          <p className="text-gray-500">No leads found.</p>
        </div>
      )}

      {!loading && leads.length > 0 && (
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
        message="Are you sure you want to delete this lead? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setConfirmationOpen(false)}
      />

      {modalOpen && viewingLead && (
        <AdminModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          title={`Lead Details: ${viewingLead.name}`}
          hideSaveButton
        >
          <div className="space-y-4 text-sm">
            <div>
              <label className="block font-medium mb-1">Name:</label>
              <p className="border rounded-md p-2 bg-gray-50">{viewingLead.name}</p>
            </div>
            <div>
              <label className="block font-medium mb-1">Email:</label>
              <p className="border rounded-md p-2 bg-gray-50">{viewingLead.email}</p>
            </div>
            <div>
              <label className="block font-medium mb-1">Phone Number:</label>
              <p className="border rounded-md p-2 bg-gray-50">{viewingLead.phoneNumber}</p>
            </div>
            <div>
              <label className="block font-medium mb-1">Message:</label>
              <p className="border rounded-md p-2 bg-gray-50 whitespace-pre-wrap">{viewingLead.message || 'N/A'}</p>
            </div>
            <div>
              <label className="block font-medium mb-1">Submitted On:</label>
              <p className="border rounded-md p-2 bg-gray-50">
                {formatDate(viewingLead.timestamp)}
              </p>
            </div>
            <div>
              <label className="block font-medium mb-1">Status:</label>
              <div className="flex items-center gap-2">
                <Badge variant={getStatusBadgeVariant(viewingLead.status)} className="capitalize flex items-center gap-1">
                  {getStatusIcon(viewingLead.status)} {viewingLead.status.replace(/_/g, ' ')}
                </Badge>
                <Select
                  value={viewingLead.status}
                  onValueChange={(value: LeadStatus) => handleUpdateStatus(viewingLead.id, value)}
                >
                  <SelectTrigger className="w-[140px] h-9">
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {viewingLead.updatedBy && (
              <div>
                <label className="block font-medium mb-1">Last Updated By:</label>
                <p className="border rounded-md p-2 bg-gray-50">{viewingLead.updatedBy}</p>
              </div>
            )}
            {viewingLead.updatedAt && (
              <div>
                <label className="block font-medium mb-1">Last Updated At:</label>
                <p className="border rounded-md p-2 bg-gray-50">
                  {formatDate(viewingLead.updatedAt)}
                </p>
              </div>
            )}
          </div>
        </AdminModal>
      )}
    </div>
  );
}